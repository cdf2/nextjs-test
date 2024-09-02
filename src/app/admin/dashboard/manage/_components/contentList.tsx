import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Skeleton } from 'antd';
import { cookies } from 'next/headers';
import { GetMemoResponseData } from '@/app/admin/(datatype)/datatype';

interface MemoType {
  id?: number;
  title?: string;
  content?: string;
  updatedAt?: string;
  key?: number
  loading: boolean;
}

const count = 3;
type Props = {
  setCollapsed: (collapsed: boolean) => void;
};

const ContentList: React.FC<Props> = (props: Props) => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<MemoType[]>([]);
  const [list, setList] = useState<MemoType[]>([]);
  const GetDataUrl = `/api/memo?results=${count}`;
  useEffect(() => {
    fetch(GetDataUrl)
      .then((res) => res.json())
      .then((res: GetMemoResponseData) => {
        console.log(res);
        setInitLoading(false);
        setData(res.data);
        setList(res.data);
      });
  }, []);

  const onLoadMore = () => {

    setLoading(true);
    setList(
      data.concat([...new Array(count)].map(() => ({ loading: true,}))),
    );
    fetch(GetDataUrl)
      .then((res) => res.json())
      .then((res) => {
        
        const newData = data.concat(res.data);
        setData(newData);
        setList(newData);
        setLoading(false);
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event('resize'));
      });
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  return (
    <List
      className="demo-loadmore-list"
      loading={initLoading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={list}
      renderItem={(item) => (
        <List.Item key={item.id}
          actions={[<a key='1'>{`${item.updatedAt}`}</a>,<a key='2' onClick={() => props.setCollapsed(true)}>edit</a>]}
        >
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
            //   avatar={<Avatar src={item.picture.large} />}
              title={<a href="https://ant.design">{item.title}</a>}
              description={item.content}
            />
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default ContentList;