class TweetCompose {

  constructor(el) {
    this.$tweetComposeEl = $(el);
    this.$submitEl = this.$tweetComposeEl.find(".tweet-submit");
    this.$tweetTextArea = this.$tweetComposeEl.find('textarea');
    this.submit();
    this.handleInput();
  }

  submit() {
    this.$submitEl.on("click", event => {
      event.preventDefault();

      let formData = this.$tweetComposeEl.serializeJSON();
      let $formInputs = $("tweet-compose:input");

      $(this).attr("disabled", true);

      $.ajax({
        url: "/tweets",
        type: "POST",
        data: formData,
        dataType: "json",
        success: (tweet) => {
          this.handleSuccess(tweet, $formInputs);
        }
      });
    });
  }

  clearInput($inputs) {
    $inputs.each( (_, $input) => {
      $input.empty();
    });
  }

  handleSuccess(tweet, $inputs) {
    this.clearInput($inputs);
    this.$submitEl.attr("disabled", false);

    let feedUlId = this.$tweetComposeEl.data('tweets-ul');
    let $feedUl = $(feedUlId);

    let $li = $('<li></li>');
    let tweetContent = JSON.stringify(tweet.content);
    $li.text(tweetContent);

    $feedUl.prepend($li);
  }

  handleInput() {
    this.$tweetTextArea.on("input", event => {
      let text = this.$tweetTextArea.val();
      let charsCount = 140 - text.length;
      if (charsCount < 0) {
        alert("Character Limit Exceeded");
        this.$tweetTextArea.val(text.slice(0, (text.length - 1)));
      } else {
        $('.chars-left').text(`Characters Remaining: ${charsCount}`);
      }


    });
  }
}

module.exports = TweetCompose;