import React, { useEffect } from 'react'
import useGlobalStore, { PageEnum } from '../../store/global';

const Billing = () => {
  const { SetCurrentPage } = useGlobalStore();
  useEffect(() => {
    SetCurrentPage(PageEnum.Billing);
  }, []);
  
  return (
    <div>Billing</div>
  )
}

export default Billing