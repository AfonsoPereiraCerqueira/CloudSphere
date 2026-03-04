import React from 'react'

const TextArea = ({icon:Icon, ...props}) => {
  return (
    <div className='relative mb-6'>
        <div className="absolute inset-y-3 left-0 items-center pl-3 pointer-events-none">
            <Icon className="size-5 text-orange-500" />
        </div>
        <textarea 
            {...props}
            className="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-orange-500
            focus:ring-2 focus:ring-orange-500 text-white placeholder-gray-400 transition duration-200"
        ></textarea>
    </div>
  )
}

export default TextArea