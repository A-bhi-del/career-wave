export default function SimpleTestPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Simple Test Page</h1>
      <p className="text-lg mb-4">
        If you can see this page, the Next.js server is working correctly!
      </p>
      
      <div className="space-y-4">
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <strong>✅ Success!</strong> The application is running properly.
        </div>
        
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
          <strong>ℹ️ Info:</strong> You can now navigate to other pages:
          <ul className="list-disc list-inside mt-2">
            <li><a href="/" className="underline hover:text-blue-900">Home Page</a></li>
            <li><a href="/login" className="underline hover:text-blue-900">Login</a></li>
            <li><a href="/debug" className="underline hover:text-blue-900">Debug Page</a></li>
          </ul>
        </div>
        
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <strong>⚠️ Note:</strong> If the home page shows 404, it might be because there are no job posts in the database after the reset.
        </div>
      </div>
    </div>
  );
}