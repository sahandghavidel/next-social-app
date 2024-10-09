import User from '../../../../lib/models/user.model';
import { connect } from '../../../../lib/mongodb/mongoose';
import { currentUser } from '@clerk/nextjs/server';

export const POST = async (req) => {
  try {
    await connect();

    const user = await currentUser();
    const data = await req.json();

    const userProfileId = data.userProfileId;
    const userWhoFollowsId = data.userWhofollowsId;

    if (!user || user.publicMetadata.userMongoId !== userWhoFollowsId) {
      return new Response('Unauthorized', { status: 401 });
    }

    const userWhoFollowsFromMongoDB = await User.findById(userWhoFollowsId);

    if (!userWhoFollowsFromMongoDB) {
      return new Response('User who follows not found in the db', {
        status: 404,
      });
    }

    const userProfileIdFromMongoDB = await User.findById(userProfileId);

    if (!userProfileIdFromMongoDB) {
      return new Response('User to follow not found in the db', {
        status: 404,
      });
    }

    // prevent user from following themselves

    if (
      userWhoFollowsFromMongoDB._id.toString() ===
      userProfileIdFromMongoDB._id.toString()
    ) {
      return new Response('You cannot follow yourself', { status: 400 });
    }

    const isFollowing = userWhoFollowsFromMongoDB.following.find(
      (item) => item.toString() === userProfileIdFromMongoDB._id.toString()
    );

    if (isFollowing) {
      userWhoFollowsFromMongoDB.following =
        userWhoFollowsFromMongoDB.following.filter(
          (item) => item.toString() !== userProfileIdFromMongoDB._id.toString()
        );
      userProfileIdFromMongoDB.followers =
        userProfileIdFromMongoDB.followers.filter(
          (item) => item.toString() !== userWhoFollowsFromMongoDB._id.toString()
        );
    } else {
      userWhoFollowsFromMongoDB.following.push(userProfileIdFromMongoDB._id);
      userProfileIdFromMongoDB.followers.push(userWhoFollowsFromMongoDB._id);
    }

    await userWhoFollowsFromMongoDB.save();
    await userProfileIdFromMongoDB.save();

    return new Response(JSON.stringify(userWhoFollowsFromMongoDB), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response('Failed to follow/unfollow user', { status: 500 });
  }
};