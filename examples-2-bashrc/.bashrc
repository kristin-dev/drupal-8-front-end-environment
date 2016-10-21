# K2 Aliases
# a-theme is the fiction theme name / domain for this example

# Example aliases
alias cda='cd /Users/k2/Sites/devdesktop/a-theme/docroot/sites/all/themes/a-theme;'
alias cdag='cd /Users/k2/Sites/devdesktop/a-theme/docroot/sites/all/themes/a-theme; gulp;'
alias ulia='drush uli --uri="http://dev.a-theme.local:8083";'
alias scripta='cd /Users/k2/Sites/devdesktop/a-theme/docroot; scripts/after_local_restore.sh @a-theme;'
alias checkouta='git checkout dev;'

# Permissions example
alias gitperms='cd /Applications/MAMP/htdocs/a-theme/sites/all/modules; git config core.fileMode false; chmod -R 777 custom;'

# Drush in correct directory
alias rr='drush rr;'
alias fra='drush features-revert-all --yes;'

# Pantheon alias example - drush
alias pcc='drush @pantheon.a-theme.dev cc all;'
alias revertdev='drush --strict=0 @pantheon.a-theme.dev features-revert-all --force --yes;'
alias zflushdev='drush @pantheon.a-theme.dev fra --yes; drush @pantheon.a-theme.dev updatedb; drush @pantheon.a-theme.dev cc all;'

# Move Directories
alias chtdocs='cd /Applications/MAMP/htdocs;'
alias ck2='cd /Users/k2;'
alias cdocuments='cd /Users/k2/Documents;'
alias cdownloads='cd /Users/k2/Downloads;'
alias cdesktop='cd /Users/k2/Desktop;'

# Edit and Update Aliases
alias updatealiases='. ~/.bashrc'
alias aliases='vi ~/.bashrc'


