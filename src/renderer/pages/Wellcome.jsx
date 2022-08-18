import React from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { getCities } from 'renderer/query/query';

const Wellcome = () => {
  const queryClient = useQueryClient();
  const dataFromCache = queryClient.getQueryData('cities');

  const { data, isLoading } = getCities();
  if (isLoading) {
    toast.error('loading');
  }
  console.log(data);

  return (
    <div>
      {dataFromCache &&
        dataFromCache.map((item) => (
          <div key={item.id}>
            <div>{item.id} </div>
            <div>{item.name} </div>
            <div>{item.manger_name}</div>
          </div>
        ))}
    </div>
  );
};

export default Wellcome;
