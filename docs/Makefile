PYTHON = python

.PHONY: all clean html latexpdf epub htmlhelp

# Dependencies to perform before running other builds.
SPHINX_DEPENDENCIES = \
	it/Makefile

# Make the HTML version of the documentation with correctly nested language folders.
html: $(SPHINX_DEPENDENCIES)
	cd en && make html LANG=en
	cd it && make html LANG=it

htmlhelp: $(SPHINX_DEPENDENCIES)
	cd en && make htmlhelp LANG=en
	cd it && make htmlhelp LANG=it

epub: $(SPHINX_DEPENDENCIES)
	cd en && make epub LANG=en
	cd it && make epub LANG=it

latexpdf: $(SPHINX_DEPENDENCIES)
	cd en && make latexpdf LANG=en
	cd it && make latexpdf LANG=it

clean:
	rm -rf build/*
