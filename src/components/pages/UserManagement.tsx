//lib
import { VFC, memo, useEffect } from 'react';

//components
import { UserCard } from '../organisms/user/UserCard';

//hook
import { useAllUsers } from '../../hooks/useAllUsers';

//chakra
import { Wrap, WrapItem, Spinner, Center } from '@chakra-ui/react';

export const UserManagement: VFC = memo(() => {
  const { getUsers, loading, users } = useAllUsers();

  useEffect(() => getUsers(), [getUsers]);

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 10 }}>
          {users.map((user) => (
            <WrapItem key={user.id} mx="auto">
              <UserCard
                imageUrl="https://source.unsplash.com/random"
                userName={user.username}
                fullName={user.name}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
    </>
  );
});
