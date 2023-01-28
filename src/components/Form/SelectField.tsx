import { useDescription, useTsController } from "@ts-react/form";

const SelectField = ({ options }: { options: string[] }) => {
    const { field, error } = useTsController<string>();
    const { label } = useDescription();
    return (
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text text-lg font-semibold">{label}</span>
            </label>
            <select
                className="select select-bordered"
                value={field.value ? field.value : "none"}
                onChange={(e) => {
                    field.onChange(e.target.value);
                }}
            >
                {!field.value && <option value="none"></option>}
                {options.map((e) => (
                    <option key={e} value={e}>
                        {e}
                    </option>
                ))}
            </select>
            <label className="label">
                {error?.errorMessage && <span className="label-text-alt text-error">{error?.errorMessage}</span>}
            </label>
        </div>
    );
}

export default SelectField