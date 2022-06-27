import * as React from 'react'

export const InfoElement: React.FC<{name: string, data:string}> = ({ name, data }) => {
  return <div className="p-1 text-left">
  <span className="font-bold">{name}</span> {data}
</div>
}

export default InfoElement
