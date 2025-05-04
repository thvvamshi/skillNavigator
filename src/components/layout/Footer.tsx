import React from "react";
const Footer: React.FC = () => {
  return <footer className="bg-gray-100 py-8 mt-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">SkillNavgiator</h3>
            <p className="text-gray-600">Find the perfect job match for your skills.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">For Job Seekers</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-primary">Browse Jobs</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Companies</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Career Advice</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">For Employers</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-primary">Post a Job</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Find Candidates</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">support@skillseeker.com</li>
              <li className="text-gray-600">+91 123456789</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} SkillSeeker. All rights reserved.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;