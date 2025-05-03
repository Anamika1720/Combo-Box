import ComboBox from "./ComboBox";

const App = () => {
  const fruits = [
    "Apple",
    "Banana",
    "Blueberry",
    "Blackcurrant",
    "Boysenberry",
    "Cherry",
    "Grapes",
    "Grapefruit",
    "Golden Apple",
    "Mango",
    "Guava",
    "Orange",
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          ComboBox
        </h1>
        <ComboBox options={fruits} />
      </div>
    </div>
  );
};

export default App;
