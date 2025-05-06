export const DataMapper = ({
  data,
  keys,
}: {
  keys: Record<
    string,
    {
      label: string;
      value: string;
    }
  >;
  data: any;
}) => {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-4 mt-5">
      {/* form item */}
      {Object.keys(data).map((item: any) => (
        <div key={item.id} className="flex flex-col w-48">
          <label className="text-sm/6 font-medium text-white">{keys[item?.id]?.label}</label>
          <div className=" mt-3 block rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white">
            {keys[item?.id]?.value}
          </div>
        </div>
      ))}
    </div>
  );
};
