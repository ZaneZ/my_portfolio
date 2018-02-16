#####################

# Vagrantfile starts

####################

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
    # config.vm.box = "centos/7"
    config.vm.box = "ubuntu/trusty64"
    config.vm.provider :virtualbox do |v|
        v.memory = 4096
        v.cpus = 4
        v.customize ["modifyvm", :id, "--nicpromisc2", "allow-all", "--ioapic", "on"]
    end

    config.vm.network "private_network", ip: "172.31.128.1", virtualbox__intnet: "innet"

    # ssh able
    config.ssh.forward_agent = true
    # Enable rest api from devbox
    config.vm.network "forwarded_port", guest: 8081, host: 8081, protocol: "tcp"
    # add workspace sharing
    if ENV['WORKSPACE']
        config.vm.synced_folder "#{ENV['WORKSPACE']}", "/home/vagrant/src/"
    end

    # Install go-lang
    config.vm.provision :shell, inline: <<-SHELL
        cd /home/vagrant/src
        chmod +x setup/setup.sh
        ./setup/setup.sh 
    SHELL
end