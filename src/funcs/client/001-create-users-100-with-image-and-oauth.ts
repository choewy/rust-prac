import { UserRepository } from '@/core';
import { setEntityData } from '@/core/helpers';
import { User, UserImage, UserOAuth } from '@/entities/client';

export const createUsers100WithImageAndOAuth = async (
  userRepository: UserRepository,
): Promise<User[]> => {
  const testName = createUsers100WithImageAndOAuth.name;

  await userRepository.save(
    [...Array(100)].map((_, i) =>
      setEntityData(new User(), {
        nickname: `${testName}(${i + 1})`,
        email: null,
        type: 'viewer',
        status: 'active',
        oauths: [
          setEntityData(new UserOAuth(), {
            platform: 'kakao',
            platformId: `kakao-${('00000000' + (i + 1)).slice(-8)}`,
            accessToken: 'kakao-accessToken',
            refreshToken: 'kakao-refreshToken',
          }),
        ],
        image: setEntityData(new UserImage(), {
          path: `/images/${testName}(${i + 1}).png`,
          mimetype: 'image/png',
          size: 100,
          width: 80,
          height: 80,
        }),
      }),
    ),
  );

  return await userRepository.find({
    relations: {
      image: true,
      oauths: true,
      followers: true,
      followings: true,
    },
  });
};
