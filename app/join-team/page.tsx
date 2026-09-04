"use client";

import TeamScreen from "@/components/TeamScreen";

export default function JoinTeamPage() {
  return (
    <>
      <TeamScreen mode="join" />

      <input
        type="checkbox"
        id="close-join-popup"
        className="peer hidden"
      />

      <div
        className="
          fixed inset-0
          z-[999999]
          flex items-center justify-center
          bg-black/60
          peer-checked:hidden
          px-4
        "
      >
        <div
          className="
            relative
            w-full max-w-[430px]
            rounded-[6px]
            border-[3px] border-black
            bg-[#073f50]
            p-7
            shadow-[6px_6px_0_rgba(0,0,0,0.85)]
          "
        >
          {/* X */}
          <label
            htmlFor="close-join-popup"
            className="
              absolute right-3 top-2
              cursor-pointer
              font-pixeboy
              text-[30px]
              leading-none
              text-red-500
              hover:scale-110
            "
          >
            ×
          </label>

          {/* Heading */}
          <h2
            className="
              mb-6
              text-center
              font-pixeboy
              text-[38px]
              leading-none
              tracking-wider
              text-yellow-400
            "
          >
            JOIN TEAM
          </h2>

          {/* Input */}
          <input
            type="text"
            placeholder="ENTER TEAM CODE"
            className="
              mb-4
              h-[50px]
              w-full
              rounded-[4px]
              border-[3px] border-black
              bg-white
              px-4
              font-pixeboy
              text-[18px]
              uppercase
              text-black
              outline-none
            "
          />

          {/* JOIN TEAM */}
          <label
            htmlFor="close-join-popup"
            className="
              mb-3
              flex h-[50px] w-full
              cursor-pointer
              items-center justify-center
              rounded-[4px]
              border-[3px] border-black
              bg-yellow-400
              font-pixeboy
              text-[21px]
              text-black
              shadow-[3px_3px_0_rgba(0,0,0,0.85)]
              hover:brightness-95
              active:translate-y-[1px]
            "
          >
            JOIN TEAM
          </label>

          {/* CANCEL */}
          <label
            htmlFor="close-join-popup"
            className="
              flex h-[50px] w-full
              cursor-pointer
              items-center justify-center
              rounded-[4px]
              border-[3px] border-black
              bg-gray-300
              font-pixeboy
              text-[21px]
              text-black
              shadow-[3px_3px_0_rgba(0,0,0,0.85)]
              hover:brightness-95
              active:translate-y-[1px]
            "
          >
            CANCEL
          </label>
        </div>
      </div>
    </>
  );
}