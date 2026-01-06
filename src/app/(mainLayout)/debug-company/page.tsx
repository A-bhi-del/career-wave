import { auth } from "@/app/utils/auth";
import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/requireuser";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default async function DebugCompanyPage() {
  const session = await requireUser();
  
  let user = null;
  let company = null;
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
      }
    });

    if (user) {
      company = await prisma.company.findUnique({
        where: { userId: session.id },
        select: {
          id: true,
          name: true,
          location: true,
          about: true,
          Logo: true,
          website: true,
          xAccount: true,
        }
      });
    }
  } catch (err: any) {
    error = err.message;
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold">Company Debug Information</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">Error: {error}</p>
            </div>
          ) : user ? (
            <div className="space-y-3">
              <div><strong>User ID:</strong> {user.id}</div>
              <div><strong>Name:</strong> {user.name}</div>
              <div><strong>Email:</strong> {user.email}</div>
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
            </div>
          ) : (
            <p>No user data found</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Company Profile</CardTitle>
        </CardHeader>
        <CardContent>
          {company ? (
            <div className="space-y-3">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">✅ Company Profile Found</h3>
                <div className="space-y-2">
                  <div><strong>Company ID:</strong> {company.id}</div>
                  <div><strong>Company Name:</strong> {company.name}</div>
                  <div><strong>Location:</strong> {company.location}</div>
                  <div><strong>Website:</strong> {company.website}</div>
                  <div><strong>X Account:</strong> {company.xAccount || "Not set"}</div>
                  <div><strong>Logo:</strong> {company.Logo}</div>
                </div>
                <p className="text-green-600 mt-3">
                  ✅ You should be able to create job posts!
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-800 mb-2">❌ No Company Profile Found</h3>
              <p className="text-red-700 mb-3">
                You need to complete company onboarding before you can post jobs.
              </p>
              <Link 
                href="/onboarding"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                Complete Company Onboarding
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Troubleshooting</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">If job posting is not working:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Make sure you have completed company onboarding</li>
                <li>Check that your user type is set to "COMPANY"</li>
                <li>Verify you have a company profile created</li>
                <li>Check browser console for any JavaScript errors</li>
                <li>Make sure all required form fields are filled</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Quick Actions:</h4>
              <div className="space-y-2">
                <Link href="/onboarding" className="block text-blue-600 hover:underline">
                  → Go to Onboarding
                </Link>
                <Link href="/post-job" className="block text-blue-600 hover:underline">
                  → Try Post Job Again
                </Link>
                <Link href="/test-roles" className="block text-blue-600 hover:underline">
                  → Check User Roles
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}