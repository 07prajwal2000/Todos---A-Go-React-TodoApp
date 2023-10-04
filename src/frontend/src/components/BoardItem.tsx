import { HashtagIcon } from '@heroicons/react/20/solid';
import { CheckCircleIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import React from 'react'
import { useNavigate } from 'react-router-dom';

type BoardItemType = {
  Id: number | string;
  Name: string;
  Description: string;
  TotalAvailable: number;
  TotalCompleted: number;
  Remaining: number;
  UserCount: number;
};

const BoardItem: React.FC<BoardItemType> = (props) => {
  const nav = useNavigate();

  return (
    <div onClick={() => nav('/account/boards/' + props.Id)} className='board-item cursor-pointer shadow d-flex flex-column justify-content-between shadow-lg col-md-6 col-xxl-4 rounded col-12 mb-3 px-3 py-2'>
      <h3>{props.Name}</h3>
      <p style={{height: '50%', textOverflow: 'ellipsis', overflow: 'hidden'}} className='px-1'>{props.Description}</p>
      
      <div className='d-flex px-2 gap-2'>

        <div title={`Total: ${props.TotalAvailable}`} className="p-0 border rounded-2 d-flex gap-2 justify-content-center align-items-center">
          <HashtagIcon className='h-75 p-1 m-0' />
          <p className='font-monospace p-0 pe-1 m-0'>{props.TotalAvailable}</p>
        </div>

        <div title={`Completed: ${props.TotalCompleted}`} className="p-0 border rounded-2 d-flex gap-2 justify-content-center align-items-center">
          <CheckCircleIcon className='h-75 p-1 m-0' />
          <p className='font-monospace p-0 pe-1 m-0'>{props.TotalCompleted}</p>
        </div>

        <div title={`Remaining: ${props.Remaining}`} className="p-0 border rounded-2 d-flex gap-2 justify-content-center align-items-center">
          <HashtagIcon className='h-75 p-1 m-0' />
          <p className='font-monospace p-0 m-0 pe-1'>{props.Remaining}</p>
        </div>

        <div title={`${props.UserCount} user(s) has access`} style={{marginLeft: 'auto', height: '35px'}} className="p-0 border rounded-2 d-flex gap-2 justify-content-center align-items-center">
          <UserGroupIcon className='h-75 p-1 m-0' />
          <p className='font-monospace p-0 m-0 pe-1'>{props.UserCount}</p>
        </div>

      </div>

    </div>
  )
}

export default BoardItem