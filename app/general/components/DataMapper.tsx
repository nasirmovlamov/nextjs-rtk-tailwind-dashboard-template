export const DataMapper = ({
  data,
}: {
  data: {
    label: string;
    value: string;
    id: number;
  }[];
}) => {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-4 mt-5">
      {/* form item */}
      {data.map((item) => (
        <div key={item.id} className="flex flex-col w-48">
          <label className="text-sm/6 font-medium text-white">{item.label}</label>
          <div className=" mt-3 block rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white">
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
};
