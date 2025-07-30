const MyGroup = ({ fcn, text, link }) => (
  <div className="flex items-center space-x-4">
    <button
      onClick={fcn}
      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
    >
      Connect Wallet
    </button>
    {link && (
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="text-blue-500 underline"
      >
        View on HashScan
      </a>
    )}
    <span className="text-sm text-gray-600">{text}</span>
  </div>
);
export default MyGroup;