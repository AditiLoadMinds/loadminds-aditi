// PDF Preview Component
const PDFPreview = ({ file, onApprove, isApproved }) => {
    const canvasRef = useRef(null);
    const renderTaskRef = useRef(null); // track ongoing render
  
    const renderPDF = async () => {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const page = await pdfDoc.getPage(1); // Render only 1st page
  
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
  
      canvas.width = viewport.width;
      canvas.height = viewport.height;
  
      // Cancel previous render if still ongoing
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch (err) {
          console.warn('Render cancel error:', err);
        }
      }
  
      renderTaskRef.current = page.render({ canvasContext: context, viewport });
  
      try {
        await renderTaskRef.current.promise;
      } catch (err) {
        if (err?.name !== 'RenderingCancelledException') {
          console.error('PDF render error:', err);
        }
      }
    };
  
    React.useEffect(() => {
      renderPDF();
  
      // Cleanup on unmount
      return () => {
        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
        }
      };
    }, [file]);
  
    return (
      <div className="bg-white p-4 border rounded shadow mb-6">
        <canvas ref={canvasRef} className="w-full mb-3" />
        <button
          className={`text-white px-4 py-2 rounded text-sm ${isApproved ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}`}
          onClick={onApprove}
        >
          {isApproved ? 'Approved ✅' : 'Approve PDF'}
        </button>
      </div>
    );
  };
  