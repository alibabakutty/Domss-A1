import React from 'react'
import RightSideButton from '../right-side-button/RightSideButton'

const GroupCreateForm = () => {
  return (
    <>
      <div>
        <div className='w-[50%] h-[93.2vh] border border-r-slate-400'>
          <form action="">
            <div>
              <label htmlFor="groupName">Name</label>
              <span>:</span>
              <input type="text" id="groupName" name="groupName" />
            </div>
            <div>
              <label htmlFor="groupAlias">(alias)</label>
              <span>:</span>
              <input type="text" id="groupAlias" name="groupAlias" />
            </div>
            <div>
              <label htmlFor="underGroup">Under</label>
              <span>:</span>
              <input type="text" id='underGroup' name='underGroup' />
            </div>
            <div>
              
            </div>
          </form>
        </div>
        <RightSideButton />
      </div>
    </>
  )
}

export default GroupCreateForm