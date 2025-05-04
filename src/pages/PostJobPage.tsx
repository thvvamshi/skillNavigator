
import JobPostForm from "@/components/forms/JobPostForm";

const PostJobPage = () => {
  return (
    <div className="container-custom py-12">
      <h1 className="text-4xl font-bold mb-2">Post a New Job</h1>
      <p className="text-muted-foreground mb-8">
        Fill out the form below to add a new job listing
      </p>
      
      <JobPostForm />
    </div>
  );
};

export default PostJobPage;
