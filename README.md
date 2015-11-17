# xwalk-5133

This is a sample app that demonstrates a solution to the problem posed in [XWALK-5133](https://crosswalk-project.org/jira/browse/XWALK-5133) (Crosswalk build.gradle file included in Cordova android build does not support providing a custom Maven repository).

It is configured to include a copy of the Crosswalk plugin that has been modified so that the maven repository url is _invalid_ in order to simulate a corporate environment where the _valid_ maven repository url is inaccessible due to network access restrictions.  The app is configured to include the Android platform and the altered Crosswalk plugin.

This app includes a build-extras.gradle (as described in the "Extending build.gradle" section of the Cordova [Android Shell Tool Guide](https://cordova.apache.org/docs/en/latest/guide/platforms/android/tools.html)) which specifies the _valid_ maven repository url for Crosswalk in order to demonstrate how to specify a custom corporate maven repository url (in a way that does not require setting up a custom maven repository).

The app also includes a hook that copies build-extras.gradle to the correct location in the project.

In order to exercise the demo, do:
`cordova prepare`

This will install the Android platform and the altered plugin per the app's configuration.

Then do:
`cordova build android`

Observe that the Crosswalk dependency is resolved using the overridden maven repo instead of the invalid repo that is specified in the plugin.

After the first time (or possibly before the first time if you have previously downloaded Crosswalk), the dependency will be cached - in order to remove it from gradle cache, just delete the corresponding cache directory, e.g.,
`rm -rf ~/.gradle/caches/modules-2/files-2.1/org.xwalk`

