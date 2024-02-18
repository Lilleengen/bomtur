package expo.modules.nativecard

import android.content.Context
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.views.ExpoView
import expo.modules.kotlin.viewevent.EventDispatcher
import androidx.compose.ui.graphics.Color
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.ComposeView
import androidx.compose.ui.unit.dp
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.padding
import androidx.compose.ui.Modifier
import androidx.compose.ui.Alignment
import androidx.compose.foundation.layout.Column

class NativeCardView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {
  internal val composeView = ComposeView(context).also {
    // add the compose view as a child
    addView(it)
    it.layoutParams = LayoutParams(
      android.view.ViewGroup.LayoutParams.MATCH_PARENT,
      android.view.ViewGroup.LayoutParams.MATCH_PARENT,
      )
    it.setContent {
      NativeCardInternal("")
    }
  }

  // update the text
  fun updateText(newValue: String) {
    composeView.setContent {
      NativeCardInternal(newValue)
    }
  }
}

@Composable
fun NativeCardInternal(text: String) {
  ElevatedCard(
    elevation = CardDefaults.cardElevation(
      defaultElevation = 6.dp
    ),
  ) { Text(
    text = text,
    modifier = Modifier
      .padding(16.dp),
  ) }
}