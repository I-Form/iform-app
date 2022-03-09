# Reads/writes the config file for settin:g

# what external servers we are using
# our database locations
# proxy servers if needed for accessing external servers


from configparser import ConfigParser
import os, logging

class ConfigClass(ConfigParser):

    def __init__(self):
        super().__init__()
        
        self.config_file_path = os.path.realpath(os.path.join(__file__,'../config.ini'))

        if os.path.isfile(self.config_file_path):
            print('config file found')
        else:
            print('config file not found!')

        if self.readConfigFile():
            msg = 'No configuration file found'
            logging.error(msg)
            raise Exception(msg)

        return 0

    def writeConfigFile(self):
        with open(self.config_file_path, 'w') as f:
            self.write(f)
        return 0


    def readConfigFile(self):
        try:
            with open(self.config_file_path, 'r') as f:
                self.read_file(f)
                print('config read okay')
            return 0

        except:
            print('config not read okay')
            return 1


# we define the instance that will be accessed when importing this module
config = ConfigParser()
config.read(os.path.realpath(os.path.join(__file__,'../config.ini')))
        
# for debugging purposes
if __name__ ==  '__main__':
    #c = Config
    pass
