### For Ubuntu:

#### Clear all the existing Docker

`$ sudo apt-get remove docker docker-engine docker.io`

#### Supported storage drivers

`$ sudo apt-get update`

`$ sudo apt-get install linux-image-extra-$(uname -r) linux-image-extra-virtual`

#### Install Docker From Repository

`$ sudo apt-get update`

`$ sudo apt-get install apt-transport-https ca-certificates curl software-properties-common`

`$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -`

`$ sudo apt-key fingerprint 0EBFCD88`

`$ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"`

`$ sudo apt-get update`

`$ sudo apt-get install docker-ce`


