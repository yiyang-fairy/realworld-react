export default function LoginForm(props) {
    const inputArray = props.inputArray.map((item, index)=>{
        return (
            <p className="flex items-center border-2 border-solid border-gray-300 p-5 mb-5 rounded-md font-blod" key={index}>
                <input placeholder={item.name} className=" w-full" type="text" value={item.value} onChange={item.handleChange}/>
            </p>
        )
    })
    return (
        <div className="flex justify-center items-center w-full">
            <div className="flex flex-col w-full">
                {inputArray}
            </div>
            
        </div>
    )
}