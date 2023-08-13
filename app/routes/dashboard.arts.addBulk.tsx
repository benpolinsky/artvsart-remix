import { redirect, type ActionArgs } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import React, { useRef } from "react";
import { db } from "~/storage/db.server";
import { ErrorBag, type ErrorBagResponse } from "~/utils/errors";
import stylesUrl from "~/styles/forms.css";
import { addStyleSheets } from "~/utils/helpers";

export const links = addStyleSheets(stylesUrl);

// yep just smashing the controller into the view
// !!Add validation/sanitization where necessary!!
export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const jsonDump = formData.get("json-dump")?.toString();
  const errorBag = new ErrorBag();

  if (!jsonDump) {
    errorBag.add("json-dump", "No JSON Provided");
    return { ...errorBag.response(), status: 400 };
  }

  try {
    const jsonInput = JSON.parse(jsonDump);

    // eh don't like this...
    const promises = jsonInput.length
      ? jsonInput.map((d: any) => db.art.create({ data: d }))
      : [db.art.create({ data: jsonInput })];

    await Promise.all(promises);
  } catch (error) {
    errorBag.add("global", error as string | Error);
    return { ...errorBag.response(), status: 400 };
  }

  return redirect("/arts");
};

export default function ArtsAddBulk() {
  const validateTextareaElementRef = useRef<HTMLTextAreaElement>(null);
  const actionData = useActionData<ErrorBagResponse | undefined>();

  const validateJson = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(validateTextareaElementRef.current?.value);
    e.preventDefault();
  };

  return (
    <form id="add-bulk" method="post">
      <div>
        <label>
          <p>JSON Array of Art</p>
          <TextArea
            name="json-dump"
            id="json-dump"
            ref={validateTextareaElementRef}
            errors={actionData?.errors}
          />
        </label>
      </div>

      <div>
        <button
          type="submit"
          className="button"
          onClick={(e) => validateJson(e)}
        >
          Validate
        </button>

        <button type="submit" className="button">
          Add
        </button>
      </div>
    </form>
  );
}

type TextAreaProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & { errors?: Record<string, string> };

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const nameAttr = props.name;
    const error = nameAttr && props.errors?.[nameAttr];

    return (
      <>
        {error && <span className="error-field">{error}</span>}
        <textarea ref={ref} {...props}></textarea>
      </>
    );
  }
);
