"use client";
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import { addContactData } from "../../../../mongotest/server";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const submitHandler = async (data) => {
    const { firstName, lastName, email, message } = data;

    const res = await addContactData(firstName, lastName, email, message);

    console.log(res);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (res.success) {
      alert(res.message);
    } else {
      alert(res.message);
    }
    redirect("/mainpage");
  };
  return (
    <>
      <div
        className="flex items-center justify-center min-h-screen bg-gradient-to-br m-5"
        style={{ paddingTop: "4rem" }}
      >
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="w-full  max-w-lg   bg-white rounded-xl shadow-2xl p-8 space-y-6"
        >
          <h1 className="text-xl font-bold text-gray-800 text-center">
            Contact Us
          </h1>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-gray-600 capitalize">
                First Name
              </label>
              <input
                {...register("firstName", {
                  required: true,
                  minLength: {
                    value: 3,
                    message: "First Name must be of atleast 3 letters.",
                  },
                  maxLength: {
                    value: 20,
                    message: "First Name must contain less then 20 letters.",
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "First Name must not contain numbers.",
                  },
                })}
                // name="firstName"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
                type="text"
                placeholder="Agrim"
              />
              {errors.firstName && (
                <p className="text-red-500">{errors.firstName.message}</p>
              )}
            </div>
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-gray-600 capitalize">
                Last Name
              </label>
              <input
                {...register("lastName", {
                  required: true,
                  minLength: {
                    value: 3,
                    message: "Last Name must be of atleast 3 letters.",
                  },
                  maxLength: {
                    value: 20,
                    message: "Last Name must contain less then 20 letters.",
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "Last Name must not contain numbers.",
                  },
                })}
                // name="lastName"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
                type="text"
                placeholder="Jain"
              ></input>
              {errors.lastName && (
                <p className="text-red-500">{errors.lastName.message}</p>
              )}
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9._%+-@]/,
                  message:
                    "Email must be a valid @gmail.com or @yahoo.com  or @altudo.co address.",
                },
              })}
              // name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
              type="email"
              placeholder="example@altudo.co"
            ></input>
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Message
            </label>
            <textarea
              {...register("message", {
                required: true,
                validate: (value) => {
                  if (value.toLowerCase().includes("spam")) {
                    return "Message must not contain the word 'spam'.";
                  }
                  return true;
                },
              })}
              // name="message"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
              placeholder="Message"
            ></textarea>
            {errors.message && (
              <p className="text-red-500">{errors.message.message}</p>
            )}
          </div>
          <input
            type="submit"
            disabled={isSubmitting}
            className={
              isSubmitting
                ? "w-full py-3 text-white bg-blue-400 rounded-lg"
                : "w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-500"
            }
            value={isSubmitting ? "Submitting" : "Submit"}
          />
        </form>
      </div>
    </>
  );
}
