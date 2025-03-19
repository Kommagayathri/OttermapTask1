export default function Errors({ errors }) {
    return (
      <ul className="mx-auto w-full space-y-3 rounded-xl border-2 border-red-500 px-1 py-3 text-center text-sm font-medium shadow-lg shadow-[#ff000044]">
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    );
  }