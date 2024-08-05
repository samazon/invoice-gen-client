import Image from 'next/image';

const ToastComponent = () => (
  <div className="flex items-start gap-4">
    <Image src="/success.png" height={24} width={24} alt="success icon" />
    <div className="flex flex-col">
      <p className="font-base font-medium leading-6 text-[#555555]">
        Invoice created successfully!
      </p>
      <p className="font-normal text-[#8E8E8E]">Your invoice has been created.</p>
    </div>
  </div>
);

export default ToastComponent;
