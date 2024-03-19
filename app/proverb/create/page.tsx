import CreateProverbForm from "@/components/forms/CreateProverbForm/CreateProverbForm";
import PageWrap from "@/components/PageWrap/PageWrap";

const CreateProverb = () => {
  return (
    <PageWrap className="flex justify-center">
      <CreateProverbForm className="w-full max-w-md p-6 m-auto bg-white rounded-md shadow-md" />
    </PageWrap>
  );
};

export default CreateProverb;
