import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Subscribe = () => {
  return (
    <section className="flex flex-col items-center justify-center p-8">
      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-bold">Subscribe to Daily Proverbs</h2>
        <p className="mx-auto max-w-[700px]">
          Get the Proverb of the Day delivered to your inbox every morning.
        </p>
        <form className="flex space-x-2">
          <Input
            className="max-w-lg flex-1"
            placeholder="Enter your email"
            type="email"
          />
          <Button type="submit">Subscribe</Button>
        </form>
      </div>
    </section>
  );
};

export default Subscribe;
