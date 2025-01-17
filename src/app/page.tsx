
import ButtonGroup from "./_components/buttonGroup";

export default function Home() {
  return (
    <div className="grid  pt-28 items-center justify-items-center  p-8 pb-20  font-[family-name:var(--font-geist-sans)]">
      <img src="/heading.png" alt="" />
      <div className="py-7">
        <h3 className="text-[#FFD5C2]">Empowering over 10,000 pioneers through 500+ events and 200+ collaborations.</h3>
      </div>
      <div>
        <ButtonGroup/>
      </div>
      <div className="mt-64">
        <img src="/heading2.png" alt="" />
      </div>
      <div>
        <h3></h3>
      </div>

    </div>
  );
}
