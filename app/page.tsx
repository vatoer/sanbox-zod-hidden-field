"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(1, { message: "Required" }),
  age: z.number().min(2),
  another: z.string().min(2, { message: "Required" }),
});

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [another, setAnother] = useState("");

  return (
    <div className="flex flex-col items-center p-10 text-gray-800">
      <form
        onSubmit={handleSubmit((d) => console.log(d))}
        className="flex-col gap-2 flex"
      >
        <div className="flex col-row">
          <label>Name</label>
          <input
            className="border-2 border-blue-900 mx-2"
            {...register("name")}
            onChange={(e) => setAnother(e.target.value)}
          />
        </div>
        <div className="text-red-600 mx-2">
          <>{errors.name?.message}</>
        </div>
        <div className="flex col-row">
          <label>Age</label>
          <input
            type="number"
            {...register("age", { valueAsNumber: true })}
            className="border-2 border-blue-900 mx-2"
          />
        </div>
        <div className="text-red-600 mx-2">
          <>{errors.age?.message}</>
        </div>
        <div className="flex col-row">
          <label>Another</label>
          <input
            {...register("another")}
            value={another}
            className="border-2 border-blue-900 mx-2"
          />
        </div>
        <div className="text-red-600 mx-2">
          <>{errors.another?.message}</>
        </div>
        <input type="submit" className="outline text-blue-900 cursor-pointer" />
      </form>
    </div>
  );
}
