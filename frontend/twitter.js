const FollowToggle = require('./follow_toggle');
const UsersSearch = require('./users_search');

$( () => {
  let $followToggles = $('.follow-toggle');
  $followToggles.each( (_, followToggle) => {
    new FollowToggle(followToggle);
  });

  let $usersSearch = $('.users-search');
  $usersSearch.each( (_, userSearch) => {
    new UsersSearch(userSearch);
  });
});
