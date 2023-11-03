const DepartmentForm = ({ departmentFormSubmitter, value, setValue }) => {
    return (
        <>
            <form onSubmit={departmentFormSubmitter}>
                <div className="mb-3">
                    <input type="text" required className="form-control" value={value} onChange={(e) => setValue(e.target.value)} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </>
    )
}
export default DepartmentForm;