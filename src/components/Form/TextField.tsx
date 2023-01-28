import { useDescription, useTsController } from "@ts-react/form";

const TextField = () => {
    const { field, error } = useTsController<string>();
    const { label, placeholder } = useDescription();
    return (
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text text-lg font-semibold">{label}</span>
            </label>
            <input
                type="text"
                className="input input-bordered w-full"
                placeholder={placeholder}
                value={field.value ? field.value : ""}
                onChange={(e) => {
                    field.onChange(e.target.value);
                }}
            />
            <label className="label">
                {error?.errorMessage && <span className="label-text-alt text-error">{error?.errorMessage}</span>}
            </label>
        </div>
    );
}

export default TextField