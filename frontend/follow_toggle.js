class FollowToggle {

  constructor(el, options) {
    this.$buttonEl = $(el);
    this.userId = this.$buttonEl.data('user-id') || options.userId;
    this.followState = this.$buttonEl.data('initial-follow-state') ||
      options.followState;
    this.render();
    this.handleClick();
  }

  render() {
    let buttonText;
    if (this.followState === "unfollowed") {
      buttonText = "Follow!";
      this.$buttonEl.attr("disabled", false);
    } else if (this.followState === "followed") {
      buttonText = "Unfollow!";
      this.$buttonEl.attr("disabled", false);
    } else if (this.followState === "following") {
      buttonText = "following";
      this.$buttonEl.attr("disabled", true);
    } else if (this.followState === "unfollowing") {
      buttonText = "unfollowing";
      this.$buttonEl.attr("disabled", true);
    }

    this.$buttonEl.text(buttonText);
  }

  toggle(){
    this.followState = this.followState === "following" ? "followed" :
      "unfollowed";
  }

  handleClick() {
    this.$buttonEl.on("click", event => {
      event.preventDefault();

      let reqType;
      if (this.followState === "unfollowed") {
        reqType = "POST";
        this.followState = "following";
      }
      else {
        reqType = "DELETE";
        this.followState = "unfollowing";
      }

      this.render();

      $.ajax({
        url: `/users/${this.userId}/follow`,
        type: reqType,
        dataType: "json",
        success: () => {
          this.toggle();
          this.render();
        }
      });
    });
  }
}

module.exports = FollowToggle;
