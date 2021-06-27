<template>
  <div
    @click="$emit('close')"
    class="fixed top-0 bottom-0 left-0 right-0 z-20 bg-black opacity-0 backdrop-filter backdrop-blur-3xl"
  />
  <div
    class="fixed bg-white p-14 h-4/5 z-30 top-28 left-0 right-0 sm:left-10 sm:right-10 md:w-4/5 md:m-auto lg:w-2/3 font-glight overflow-y-auto"
  >
    <span
      @click="$emit('close')"
      class="absolute top-16 right-16 cursor-pointer"
    >
      <Icon name="close" />
    </span>
    <!-- Instructions for add post -->
    <div v-if="modal === 'addPostInfo'">
      <div class="overflow-y-auto overflow-x-hidden">
        <div class="font-gbold text-2xl md:text-3xl">How to add a post?</div>
        <div class="grid gap-10 my-10">
          <div>
            <div class="font-gbold mb-3">Selecting a challenge</div>
            <div class="text-sm">
              Select a challenge from the dropdown. These are the list of
              challenges available. Earn a badge after completing each
              challenge. Until then the badge is in progress and can be seen in
              your profile.
            </div>
          </div>
          <div>
            <div class="font-gbold mb-3">Filling the box</div>
            <div class="text-sm">
              Give a catchy title and a short and crisp description of your
              progress for the day. Quality content has more upvotes otherwise.
              More upvotes mean more points. Accounts with higher points will be
              seen on top of the main page.
            </div>
          </div>
          <div>
            <div class="font-gbold mb-3">Images and Tags</div>
            <div class="text-sm">
              Spice it up by adding images and tags to your post. This is
              optional.
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Instructions for update post -->
    <div v-if="modal === 'updatePostInfo'">
      <div class="overflow-y-auto overflow-x-hidden">
        <div class="font-gbold text-2xl md:text-3xl">Updating a post?</div>
        <div class="grid gap-10 my-10">
          <div>
            <div class="font-gbold mb-3">Default</div>
            <div class="text-sm">
              Options and content will filled by default from your earlier post.
              Make the changes you want and click on update post. You can change
              any of the field options. PiPo notify you incase you have missed
              on any mandatory fields.
            </div>
          </div>
          <div>
            <div class="font-gbold mb-3">Image</div>
            <div class="text-sm">
              Updating image will overwrite the existing image
            </div>
          </div>
          <div>
            <div class="font-gbold mb-3">Will I lose my streak?</div>
            <div class="text-sm">
              No, you will not lose your streak on updating a post. Streak is
              maintained on the basis of when you create your posts. As long as
              you're creating a new post everyday on the challenge your working
              on all's good.
            </div>
          </div>
          <div>
            <div class="font-gbold mb-3">Challenge Name</div>
            <div class="text-sm">
              Badge name i.e. Challenge name can't be changed while updating a
              post since it belongs to the challenge your working on. Changing
              it simply means it doesn't belong to this challenge and you will
              inevitably lose your streak.
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Instructions for delete post -->
    <div v-if="modal === 'deleteConfirmation'">
      <div class="overflow-y-auto overflow-x-hidden">
        <div class="font-gbold text-2xl md:text-3xl">Deleting a post?</div>
        <div class="grid gap-10 my-10">
          <div>
            <div class="font-gbold mb-3">Risks</div>
            <div class="text-sm">
              Deleting a post which was earlier a part of your streak can break
              the streak 😰 you have maintained so far. Unless it is a post
              which you published today PiPo wouldn't recommend you deleting
              your posts.
            </div>
          </div>
          <div>
            <div class="font-gbold mb-3">Confirmation</div>
            <div class="text-sm">
              On clicking delete, you still have a chance of going back by
              clicking wait. If confirm is pressed the post is deleted.
            </div>
          </div>
          <div v-if="!confirmation" class="text-center mt-10">
            <button
              @click="confirmation = true"
              class="tracking-widest text-sm font-gbold text-myRed px-3 py-2 border-2 border-myRed rounded-full"
              type="submit"
            >
              DELETE
            </button>
          </div>
          <div v-if="confirmation" class="text-center mt-10">
            <div class="font-gbold text-myRed">You sure?</div>
            <div class="mb-6 text-xs text-gray-500">
              Deleting a post is risky. Think about it twice before you delete.
            </div>
            <div class="flex justify-center gap-10 font-gbold">
              <div>
                <button
                  @click="$emit('delete', null)"
                  class="text-myBlue border-2 border-myBlue p-2 rounded-md"
                >
                  Confirm
                </button>
              </div>
              <div class="text-myRed border-2 border-myRed p-2 rounded-md">
                <button @click="confirmation = false">
                  No Wait
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import Icon from "../post/postSVG.vue";

export default {
  components: { Icon },
  props: ["modal"],
  emits: ["close", "delete"],
  setup() {
    const confirmation = ref(false);
    return { confirmation };
  },
};
</script>

<style></style>
