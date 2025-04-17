import { useState } from 'react';
import VerticalNavbar from '../components/vertical-nav' 
import { Check } from 'lucide-react';

export const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('user');
  const[disabled,setDisabled]=useState(false);
  const[connected,setConnected]=useState(false);
  const[connected1,setConnected1]=useState(false);
  const disablefunction=()=>{

  }
  return (
    <div className="flex max-h-screen w-full">
      <VerticalNavbar />
      <div className="flex-1 m-10">
        <div className="border-b-2 border-gray-400 mb-4 flex gap-6 text-gray-600 font-medium text-sm">
          <button
            className={`pb-2 ${activeTab === 'user' ? 'border-b-2 border-blue-500 text-blue-600 font-medium text-lg' : 'hover:text-blue-600 font-medium text-lg'}`}
            onClick={() => setActiveTab('user')}
          >
            User
          </button>
          <button
            className={`pb-2 ${activeTab === 'integration' ? 'border-b-2 border-blue-500 text-blue-600 font-medium text-lg' : 'hover:text-blue-600 font-medium text-lg'}`}
            onClick={() => setActiveTab('integration')}
          >
            Integration
          </button>
        </div>

        
        <div className="mt-4 text-black">
          {activeTab === 'user' && (
            <>
            <div className='flex flex-col'>
                <div className='py-3 flex flex-col'>
                    <label className="text-sm font-medium mb-2">Name</label>
                    <input type="text"
                        className='w-96 border-2 rounded-lg border-gray-200 p-1 py-2'
                    />
                </div>
                <div className='py-3 flex flex-col'>
                    <label className='text-sm font-medium mb-2'>Contact</label>
                    <input type="text"
                        className='w-96 border-2 rounded-lg border-gray-200 p-1 py-2'
                    />
                </div>
                <div className='py-3 flex flex-col'>
                    <label className='text-sm font-medium mb-2'>Email</label>
                    <div className='flex flex-row gap-4'>
                    <input type="text"
                        className='w-96 border-2 rounded-lg border-gray-200 p-1 py-2'

                    />
                    <input type="text"
                        className='w-96 border-2 rounded-lg border-gray-200 p-1 py-2'
                    />
                    </div>
                </div>
                <div className='py-3 flex flex-col'>
                    <label className='text-sm font-medium mb-2 '>Email Signature</label>
                    <input type="text"
                        className='w-96 border-2 rounded-lg border-gray-200 p-1 py-2'
                    />
                </div>

            </div>
            <div>
                <div className='py-3 flex flex-col'>
                    <label className="text-sm font-medium mb-2">Company Name</label>
                    <input type="text"
                        disabled={disabled}
                        className='w-96 border-2 rounded-lg border-gray-200 p-1 py-2'
                    />
                </div>
                <div className='py-3 flex flex-col'>
                    <label className="text-sm font-medium mb-2">Company Address</label>
                    <div className='flex flex-col max-w-xl'>
                        <div>
                            <input type="text"
                                disabled={disabled}
                                className='w-full border-2 rounded-lg border-gray-200 p-1 py-2 mb-4'
                            />
                        </div>
                        <div className='flex flex-row gap-4'>
                            <input type="text"
                                disabled={disabled}
                                className='w-full border-2 rounded-lg border-gray-200 p-1 py-2'
                            />
                            <input type="text"
                                disabled={disabled}
                                className='w-full border-2 rounded-lg border-gray-200 p-1 py-2'
                            />
                        </div>
                    </div>
                </div>
            </div>
            </>
            
          )}
          {activeTab === 'integration' && (
            <div className='flex flex-row w-3/4 gap-4'>
                <div className='border border-gray-200 w-96 h-52 rounded-xl '>
                    <div className='flex flex-col gap-4 p-6'>
                        <img src="/images/truck.png" className='w-8 h-8'></img>
                        <label className='font-medium'>Logistics</label>
                        <p className='text-gray-600 text-xs'>Connect your logistics email with LoadMinds</p>
                        <button
                            onClick={() => setConnected(true)}
                            className={`rounded-lg text-xs w-full p-2 flex items-center justify-center gap-2 transition-all duration-300 ${
                                connected
                                ? 'bg-green-600 text-white'
                                : 'border border-gray-100 text-black hover:bg-gray-100'
                            }`}
                            >
                            {connected && <Check size={16} />}
                            {connected ? 'Connected' : 'Connect'}
                            </button>
                    </div>
                </div>
                <div className='border border-gray-200 w-96 h-52 rounded-xl'>
                    <div className='flex flex-col gap-4 p-6'>
                        <img src="/images/truck.png" className='w-8 h-8'></img>
                        <label className='font-medium'>Accounting</label>
                        <p className='text-gray-600 text-xs'>Connect your logistics email with LoadMinds</p>
                        <button
                            onClick={() => setConnected1(true)}
                            className={`rounded-lg text-xs w-full p-2 flex items-center justify-center gap-2 transition-all duration-300 ${
                                connected1
                                ? 'bg-green-600 text-white'
                                : 'border border-gray-100 text-black hover:bg-gray-100'
                            }`}
                            >
                            {connected1 && <Check size={16} />}
                            {connected1 ? 'Connected' : 'Connect'}
                            </button>
                    </div>
                </div>
            </div>
            
          )}
        </div>
      </div>
    </div>
  );
};
