import Button from "@/app/general/components/Button";

export default function SuppliesCreate() {
  return (
    <div className="flex flex-col bg-[#2b353dcd] w-full rounded p-4 text-white">
      <h1 className="text-2xl">Vasitə əlavə et</h1>
      <form className="flex flex-wrap gap-x-5 gap-y-4 mt-5">
        {/* form group */}
        <div className="flex flex-col ">
          <label className="text-sm/6 font-medium text-white">Vasitə Adı</label>
          <input
            name="supplyName"
            className="mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white"
          />
          <span className="text-sm/6 font-sm text-red-600">error message</span>
        </div>

        {/* form group */}
        <div className="flex flex-col ">
          <label className="text-sm/6 font-medium text-white">
            Vasitə Kodu
          </label>
          <input
            name="supplySerialNumber"
            className="mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white"
          />
          <span className="text-sm/6 font-sm text-red-600">error message</span>
        </div>

        <div className="w-full">
          <Button>Təsdiqlə</Button>
        </div>
      </form>
    </div>
  );
}
