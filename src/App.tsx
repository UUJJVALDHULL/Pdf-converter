
import Header from './components/Header';
import ImageToPdfConverter from './components/ImageToPdfConverter';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mt-12 mx-auto px-4 py-8">
        <ImageToPdfConverter />
      </main>
      <Footer />
    </div>
  );
}

export default App;