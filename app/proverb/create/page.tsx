import CreateProverbForm from "@/components/forms/CreateProverbForm/CreateProverbForm";
import PageWrap from "@/components/PageWrap/PageWrap";

const CreateProverb = () => {
  return (
    <PageWrap>
      <div className="flex justify-center">
        <CreateProverbForm className="max-w-80" />
      </div>
    </PageWrap>
  );
};

export default CreateProverb;
