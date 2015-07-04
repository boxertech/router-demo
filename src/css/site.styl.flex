body
  padding-top .5em
  font: 14px "Lucida Grande", Helvetica, Arial, sans-serif
a
  color: #00B7FF

header, footer, section.section-status
  display: block
  //border: 1px solid blue
header
  margin-bottom  .3em

.navbar-header
  border-bottom 1px solid #a2a2a2
.navbar-header .navbar-brand
  font-weight 900
  background: -webkit-linear-gradient(#9fb8e8, #8ca2d2);
  background:    -moz-linear-gradient(#9fb8e8, #8ca2d2);
  background:     -ms-linear-gradient(#9fb8e8, #8ca2d2);
  background:      -o-linear-gradient(#9fb8e8, #8ca2d2);
  background:         linear-gradient(#9fb8e8, #8ca2d2);
  padding: .2em .5em
.navbar-header .navbar-menu
  background: -webkit-linear-gradient(#d2d2d2, #cdcdcd);
  background:    -moz-linear-gradient(#d2d2d2, #cdcdcd);
  background:     -ms-linear-gradient(#d2d2d2, #cdcdcd);
  background:      -o-linear-gradient(#d2d2d2, #cdcdcd);
  background:         linear-gradient(#d2d2d2, #cdcdcd);
  padding: .2em .5em
  font-size: 12px;
  font-family: Tahoma, Geneva, sans-serif;
  text-align: left;
  text-shadow: .5px .5px .5px #333333;
.navbar-header .navbar-menu ul
  height: auto;
  padding: 0px 0px;
  margin: 0px;
  margin-before 0
  -webkit-margin-before 0
.navbar-header .navbar-menu li
  display: inline;
  padding-right: 15px;

.main-container
  max-resolution: 0
  padding 0
  display -webkit-flex
  display: flex
  -webkit-flex-flow: row
  -moz-flex-flow: row
  -ms-flex-flow: row
  -o-webkit-flex-flow: row
  flex-flow: row
  
.section-container
  font-weight: bold
  border: 1px solid #a2a2a2
  padding: 3px
  /*-webkit-border-radius 6px*/
  /*-moz-border-radius 6px*/
  /*border-radius 6px*/
  margin: 1px
.section-header
  color #526690
  margin-bottom: .2em
fullwidth
  widows: 100%

#be-main-tree
  -webkit-flex 2 6 20%
  -moz-flex 2 6 20%
  flex 2 6 20%
  -webkit-order: 1
  -moz-order: 1
  webkit-order: 1
#be-main-workspace
  //margin 4px
  -webkit-flex: 5 1 50%
  -moz-flex: 5 1 50%
  webkit-flex: 5 1 50%
  -webkit-order: 2
  -moz-order: 2
  order: 2

#be-main-preview
  -webkit-flex: 3 2 30%
  -moz-flex: 3 2 30%
  flex: 3 2 30%
  -webkit-order: 3
  -moz-order: 3
  order: 3

footer
  background-color #834512
  padding-left: 15px
  padding-right: 15px
  p
    border-top 1px solid #black

