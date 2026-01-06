import { auth } from "@/app/utils/auth";
import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/requireuser";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function TestRolesPage() {
  const session = await requireUser();
  
  let user = null;
  let error = null;
  
  try {
    user = await prisma.user.findUnique({
      where: { id: session.id },
      select: {
        id: true,
        name: true,
        email: true,
        userType: true,
        onboardingCompleted: true,
        Company: {
          select: {
            id: true,
            name: true,
          }
        },
        JobSeeker: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    });
  } catch (err: any) {
    error = err.message;
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold">User Role Test</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Current User Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">Error: {error}</p>
            </div>
          ) : user ? (
            <div className="space-y-3">
              <div>
                <strong>Name:</strong> {user.name}
              </div>
              <div>
                <strong>Email:</strong> {user.email}
              </div>
              <div>
                <strong>User Type:</strong> 
                <Badge className="ml-2">
                  {user.userType || "Not Set"}
                </Badge>
              </div>
              <div>
                <strong>Onboarding Completed:</strong> 
                <Badge variant={user.onboardingCompleted ? "default" : "secondary"} className="ml-2">
                  {user.onboardingCompleted ? "Yes" : "No"}
                </Badge>
              </div>
              
              {user.userType === "COMPANY" && user.Company && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800">Company Profile</h3>
                  <p><strong>Company Name:</strong> {user.Company.name}</p>
                  <p><strong>Company ID:</strong> {user.Company.id}</p>
                  <p className="text-green-600 mt-2">✅ Should see "Post Job" button in navbar</p>
                </div>
              )}
              
              {user.userType === "JOB_SEEKER" && user.JobSeeker && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800">Job Seeker Profile</h3>
                  <p><strong>Name:</strong> {user.JobSeeker.name}</p>
                  <p><strong>Job Seeker ID:</strong> {user.JobSeeker.id}</p>
                  <p className="text-blue-600 mt-2">✅ Should NOT see "Post Job" button in navbar</p>
                </div>
              )}
              
              {!user.userType && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-800">No Role Set</h3>
                  <p>User needs to complete onboarding to set their role.</p>
                  <p className="text-gray-600 mt-2">❌ Should NOT see "Post Job" button in navbar</p>
                </div>
              )}
            </div>
          ) : (
            <p>No user data found</p>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Navigation Test</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Check the navbar above:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>If you're a <strong>Company</strong> user, you should see the "Post Job" button</li>
            <li>If you're a <strong>Job Seeker</strong>, you should NOT see the "Post Job" button</li>
            <li>If you haven't completed onboarding, you should NOT see the "Post Job" button</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}