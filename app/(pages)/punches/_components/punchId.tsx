'use client'

interface PunchIdProps {
    setVisibleComponent: (component: string) => void;
}

export default function PunchId( {setVisibleComponent}: PunchIdProps) {
  
    function handleCancel() {
        setVisibleComponent('punchSelect')
    }
    function handleSubmit() {
        setVisibleComponent('punchConfirm')
    }

    
    return (
        <div>
            <form>
                <div>
                    <label>enter badge/id</label>
                    <input type="text" name="badge" />
                </div>
                <div className="space-x-2 mb-16">
                    <button type="button" onClick={handleCancel} className="bg-red-300 p-4 rounded w-24">cancel</button> 
                    <button type="submit" onClick={handleSubmit} className="bg-green-300 p-4 rounded w-24">submit</button>
                </div> 
            </form>
        </div>
    )
}