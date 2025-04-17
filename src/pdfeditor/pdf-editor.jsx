import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import 'pdfjs-dist/web/pdf_viewer.css';
import VerticalNavbar from "../components/vertical-nav";

// Set worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const PDFPreviewAllPages = ({ pdfBlob, onApprove, isApproved }) => {
  const containerRef = useRef();

  useEffect(() => {
    const renderAllPages = async () => {
      const pdfData = await pdfBlob.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;

      containerRef.current.innerHTML = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.3 });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport }).promise;

        containerRef.current.appendChild(canvas);
        containerRef.current.appendChild(document.createElement('hr'));
      }
    };

    renderAllPages();
  }, [pdfBlob]);

  return (
    <div className="text-center">
      <div ref={containerRef} className="space-y-4" />
      <button
        className={`mt-4 text-white px-4 py-2 rounded text-sm ${isApproved ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}`}
        onClick={onApprove}
      >
        {isApproved ? 'Approved ✅' : 'Approve PDF'}
      </button>
    </div>
  );
};

export const PDFeditor = () => {
  const [files, setFiles] = useState([]);
  const [approved, setApproved] = useState(false);
  const [mergedPDFBlob, setMergedPDFBlob] = useState(null);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [orderDetails, setOrderDetails] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const mergePDFs = async (fileList) => {
    const merged = await PDFDocument.create();
    for (const file of fileList) {
      const data = await file.arrayBuffer();
      const tempPDF = await PDFDocument.load(data);
      const copiedPages = await merged.copyPages(tempPDF, tempPDF.getPageIndices());
      copiedPages.forEach((page) => merged.addPage(page));
    }
    const mergedBytes = await merged.save();
    return new Blob([mergedBytes], { type: 'application/pdf' });
  };

  const handleFileChange = async (e) => {
    const selected = Array.from(e.target.files);
    const valid = selected.filter(f => f.type === 'application/pdf');
    if (valid.length) {
      setFiles(prev => [...prev, ...valid]);
      const blob = await mergePDFs([...files, ...valid]);
      setMergedPDFBlob(blob);
    } else {
      setError('Only PDF files are allowed.');
    }
  };

  const handleApprove = () => setApproved(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mergedPDFBlob || !approved) {
      setError('Upload and approve a PDF first.');
      return;
    }

    const doc = await PDFDocument.load(await mergedPDFBlob.arrayBuffer());
    const summary = await PDFDocument.create();
    const page = summary.addPage([600, 800]);
    const font = await summary.embedFont(StandardFonts.Helvetica);
    let y = 750;

    page.drawText('Order Summary', { x: 50, y, size: 20, font, color: rgb(0, 0.53, 0.71) });
    y -= 40;

    if (orderDetails.trim()) {
      page.drawText('Order Details:', { x: 50, y, size: 14, font });
      y -= 20;
      orderDetails.split('\n').forEach(line => {
        page.drawText(line, { x: 60, y, size: 12, font });
        y -= 18;
      });
    }

    const pages = await summary.copyPages(doc, doc.getPageIndices());
    pages.forEach(p => summary.addPage(p));
    const finalPDF = await summary.save();
    const blob = new Blob([finalPDF], { type: 'application/pdf' });

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'final-order-summary.pdf';
    a.click();
    URL.revokeObjectURL(a.href);
    navigate('/orders', { state: { message: 'PDF generated successfully.' } });
  };

  const handleDrop = async (e) => {
    e.preventDefault(); setIsDragging(false);
    const dropped = Array.from(e.dataTransfer.files);
    const valid = dropped.filter(f => f.type === 'application/pdf');
    if (valid.length) {
      setFiles(prev => [...prev, ...valid]);
      const blob = await mergePDFs([...files, ...valid]);
      setMergedPDFBlob(blob);
    } else {
      setError('Only PDF files are allowed.');
    }
  };

  return (
    <div className="h-screen flex">
      <VerticalNavbar />
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-xl font-bold mb-6">PDF Approval Dashboard</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <section>
            <h2 className="font-semibold mb-2">Upload PDFs</h2>
            <div
              className={`border-2 border-dashed rounded p-6 text-center cursor-pointer ${isDragging ? 'bg-blue-100' : ''}`}
              onClick={() => fileInputRef.current.click()}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={() => setIsDragging(true)}
              onDragLeave={() => setIsDragging(false)}
            >
              <p>Drag & drop or click to upload</p>
              <input
                type="file"
                multiple
                accept="application/pdf"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </section>

          {files.length > 0 && (
            <section>
              <h2 className="font-semibold mb-2">Files</h2>
              <ul className="list-disc ml-5 text-sm text-gray-700">
                {files.map((file, i) => (
                  <li key={i}>{file.name}</li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
              >
                Preview Merged PDF
              </button>
            </section>
          )}

          <section>
            <h2 className="font-semibold mb-2">Order Notes (Optional)</h2>
            <textarea
              value={orderDetails}
              onChange={(e) => setOrderDetails(e.target.value)}
              placeholder="Enter any details or notes..."
              rows={4}
              className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-blue-500"
            />
          </section>

          {error && <div className="text-red-600 bg-red-50 p-3 rounded">{error}</div>}

          <button
            type="submit"
            disabled={!approved || !mergedPDFBlob}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            Generate Final PDF
          </button>
        </form>

        {/* ✅ Modal */}
        {showModal && mergedPDFBlob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
            <div className="bg-white w-full max-w-5xl h-[90vh] rounded-lg shadow-xl flex flex-col overflow-hidden">
              {/* Close button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-6 text-2xl text-gray-600 hover:text-black"
              >
                &times;
              </button>

              {/* Header */}
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-semibold">Merged PDF Preview</h2>
              </div>

              {/* Body - Scrollable */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <PDFPreviewAllPages
                  pdfBlob={mergedPDFBlob}
                  isApproved={approved}
                  onApprove={() => {
                    handleApprove();
                    setShowModal(false);
                  }}
                />
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t flex justify-end">
                <button
                  className={`text-white px-4 py-2 rounded text-sm font-medium ${approved ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}`}
                  onClick={() => {
                    handleApprove();
                    setShowModal(false);
                  }}
                >
                  {approved ? 'Approved ✅' : 'Approve PDF'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
