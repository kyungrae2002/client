'use client';

import { useRegistrationStore } from '../store/registrationStore';

const RegistrationDebug = () => {
  const { registrationData, clearRegistrationData } = useRegistrationStore();

  return (
    <div className="fixed top-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg max-w-sm text-xs z-50">
      <h3 className="font-bold mb-2">Registration Store Debug</h3>
      <pre className="whitespace-pre-wrap overflow-auto max-h-96">
        {JSON.stringify(registrationData, null, 2)}
      </pre>
      <button
        onClick={clearRegistrationData}
        className="mt-2 bg-red-500 px-2 py-1 rounded text-xs"
      >
        Clear Data
      </button>
    </div>
  );
};

export default RegistrationDebug;