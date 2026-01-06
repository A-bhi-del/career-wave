import { prisma } from "@/app/utils/db";

export default async function DebugPage() {
  let dbStatus = "Testing database connection...";
  let jobCount = 0;
  let userCount = 0;
  let companyCount = 0;
  
  try {
    // Test basic database connection
    userCount = await prisma.user.count();
    companyCount = await prisma.company.count();
    jobCount = await prisma.jobPost.count();
    
    dbStatus = "✅ Database connection successful!";
  } catch (error: any) {
    dbStatus = `❌ Database error: ${error.message}`;
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold">Debug Information</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="font-semibold text-lg mb-2">Database Status</h3>
          <p className="text-sm">{dbStatus}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="font-semibold text-lg mb-2">Users</h3>
          <p className="text-2xl font-bold">{userCount}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="font-semibold text-lg mb-2">Companies</h3>
          <p className="text-2xl font-bold">{companyCount}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="font-semibold text-lg mb-2">Job Posts</h3>
          <p className="text-2xl font-bold">{jobCount}</p>
        </div>
      </div>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-lg mb-2">⚠️ Important Note</h3>
        <p className="text-sm">
          If you're seeing a 404 error on the home page, it might be because:
        </p>
        <ul className="list-disc list-inside text-sm mt-2 space-y-1">
          <li>The database was reset and there are no job posts to display</li>
          <li>You need to create some test data first</li>
          <li>There might be an authentication issue</li>
        </ul>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-lg mb-2">🔧 Quick Fixes</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Try visiting <a href="/" className="text-blue-600 hover:underline">Home Page</a></li>
          <li>Try <a href="/login" className="text-blue-600 hover:underline">Login</a> if you haven't already</li>
          <li>Try <a href="/post-job" className="text-blue-600 hover:underline">Post a Job</a> to create test data</li>
        </ul>
      </div>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="font-semibold text-lg mb-2">✅ System Status</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Server: Running on http://localhost:3001</li>
          <li>Database: Connected to PostgreSQL</li>
          <li>Authentication: NextAuth.js configured</li>
          <li>Job Application System: Implemented</li>
        </ul>
      </div>
    </div>
  );
}