// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Button(props: any) {
  return (
    <button
      {...props}
      className="inline-flex items-center gap-2 rounded-md bg-black py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner 
        focus:outline-none transition-all duration-200 ease-in-out 
        hover:translate-y-[-2px] active:translate-y-[1px] hover:shadow-lg"
    >
      {props.children}
    </button>
  );
}
